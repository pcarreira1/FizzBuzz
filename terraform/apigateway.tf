resource "aws_apigatewayv2_api" "api-gateway" {
  name          = "http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "api-gateway-stage" {
  api_id 									= aws_apigatewayv2_api.api-gateway.id
  name   									= "api-gateway-stage"
	auto_deploy							= true
	default_route_settings {
    throttling_burst_limit   = var.throttling_burst_limit
    throttling_rate_limit    = var.throttling_rate_limit
	}
	access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_logs.arn
    format = jsonencode(
      {
        httpMethod     = "$context.httpMethod"
        ip             = "$context.identity.sourceIp"
        protocol       = "$context.protocol"
        requestId      = "$context.requestId"
        requestTime    = "$context.requestTime"
        responseLength = "$context.responseLength"
        routeKey       = "$context.routeKey"
        status         = "$context.status"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "lambda-integration" {
  api_id           					= aws_apigatewayv2_api.api-gateway.id
  integration_type 					= "AWS_PROXY"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "lambda-route" {
  api_id    					= aws_apigatewayv2_api.api-gateway.id
  route_key						= "POST /fizzbuzz"
  target 							= "integrations/${aws_apigatewayv2_integration.lambda-integration.id}"
	authorization_type 	= "JWT"
  authorizer_id				= aws_apigatewayv2_authorizer.auth.id
}

resource "aws_apigatewayv2_authorizer" "auth" {
  api_id						= aws_apigatewayv2_api.api-gateway.id
  authorizer_type  	= "JWT"
  identity_sources	= ["$request.header.Authorization"]
  name             	= "cognito-authorizer"

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.client.id]
    issuer   = "https://${aws_cognito_user_pool.pool.endpoint}"
  }
}
