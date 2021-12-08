data "archive_file" "lambda-zip" {
  type        = "zip"
  source_dir  = "../lambda/dist"
  output_path = "lambda-zip.zip"
}

data "aws_iam_policy" "aws_xray_write_only_access" {
  arn = "arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess"
}

resource "aws_iam_role" "lambda-iam" {
  name 								= "lambda-iam"
  assume_role_policy 	= <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "aws_xray_write_only_access" {
  role       = aws_iam_role.lambda-iam.name
  policy_arn = "arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess"
}

resource "aws_lambda_function" "lambda" {
  function_name = "lambda-function"
  handler       = "lambda.fizzBuzzHandler"
  description   = "Fizz buzz lambda"
  role          = aws_iam_role.lambda-iam.arn
  runtime       = "nodejs14.x"
  filename         = "lambda-zip.zip"
	source_code_hash = "${data.archive_file.lambda-zip.output_base64sha256}"
	tracing_config {
    mode = "Active"
  }
	depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.lambda_logs,
  ]
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda-iam.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

resource "aws_lambda_permission" "api-gw-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api-gateway.execution_arn}/*/*/*"
}
