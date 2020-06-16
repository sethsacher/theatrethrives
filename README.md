# theatrethrives

http://theatre-thrives.s3-website-us-east-1.amazonaws.com/

handlebars .\assets\templates -f .\assets\js\handlebars.js

# CORS

Working with cors locally, you need to enable the Chrome extension that bypasses.
In the prod S3 version, it's fine.

# Template

https://bootstrapmade.com/help/dev-versions/

# AWS

CloudFormation is used to manage AWS Resources, defined in cloudformation.yml

aws cloudformation create-stack --stack-name TheatreThrivesStack --region us-east-1 --template-body file://cloudformation.yml

aws cloudformation create-change-set --stack-name TheatreThrivesStack --region us-east-1 --template-body file://cloudformation.yml --change-set-name ChangeSet-1

https://theatre-thrives-2.s3.amazonaws.com/cloudformation.yml

## MANUAL SETUP

- Add secrets to AWS Secrets Manager
- Create TheatreThrivesStack in CloudFormation using cloudformation.yml
