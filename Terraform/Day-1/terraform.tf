provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "example1" {
  ami           = "ami-0521cb2d60cfbb1a6" # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type = "t3.micro"

  tags = {
    Name = "TerraformExampleInstance1"
  }
}

resource "aws_instance" "example2" {
  ami           = "ami-0521cb2d60cfbb1a6" # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type = "t3.micro"

  tags = {
    Name = "TerraformExampleInstance2"
  }
}

resource "aws_instance" "example3" {
  ami           = "ami-0521cb2d60cfbb1a6" # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type = "t3.micro"

  tags = {
    Name = "TerraformExampleInstance3"
  }
}
