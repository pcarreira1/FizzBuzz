resource "aws_cloudwatch_log_group" "api_logs" {
  name = "/api/logs"
  retention_in_days = var.aws_logs_retention
}

resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/lambda-function"
  retention_in_days = var.aws_logs_retention
}
