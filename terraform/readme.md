## Terraform
Each AWS service have a specific file to set all the settings.

#### AWS Services used:
- **API Gateway (v2)** - authorize and redirect all the API requests
- **Lambda** - Run the business logic
- **CloudWatch** - Receive, store and rotate api gateway and lambda logs
- **Cognito** - User authentication

#### How to deploy AWS services
```sh
	terraform init
	terraform apply
```

###### Variables
| Parameter   						| Type 	  |	Default		| Description													|
| ----------------------- | ------- | --------- | ----------------------------------- |
| aws_region  						| string	| eu-west-1	| AWS services region									|
| aws_logs_retention   		| number	| 7					| Logs retention in CloudWatch (days) | 
| throttling_burst_limit  | number	| 1					| Number of concurrent request				|
| throttling_rate_limit   | number	| 2					| Limit of requests per second				|
