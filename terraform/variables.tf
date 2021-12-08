variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "aws_logs_retention" {
  type    = number
  default = 7
}

variable "throttling_burst_limit" {
  type    = number
  default = 1
}

variable "throttling_rate_limit" {
  type    = number
  default = 2
}