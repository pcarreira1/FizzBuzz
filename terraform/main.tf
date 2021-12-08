terraform {
  required_version	= "1.0.11"
}

provider "aws" {
  region  = var.aws_region

  default_tags {
    tags = {
      Project   = "Serverless fizz buzz API"
      Owner     = "Pedro Carreira"
    }
  }
}