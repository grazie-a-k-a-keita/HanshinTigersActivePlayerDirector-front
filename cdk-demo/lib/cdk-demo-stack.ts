import * as cdk from "aws-cdk-lib";
import * as cloudFront from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { HttpMethods, RedirectProtocol } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(
      this,
      `WebsiteBucket-${this.stackName}`,
      {
        websiteIndexDocument: "index.html",
        publicReadAccess: true,
      }
    );

    new cdk.aws_s3_deployment.BucketDeployment(this, "DeployWebsite", {
      sources: [cdk.aws_s3_deployment.Source.asset("../dist")],
      destinationBucket: websiteBucket,
    });

    const todoOAI = new cloudFront.OriginAccessIdentity(this, "TodoOAI");

    websiteBucket.grantRead(todoOAI);

    const todoWebDestribution = new cloudFront.CloudFrontWebDistribution(
      this,
      "TodoWebDestribution",
      {
        // httpVersion: cloudFront.HttpVersion.HTTP1_1,
        // viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.ALLOW_ALL,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
              originAccessIdentity: todoOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );

    new cdk.CfnOutput(this, "TodoWebDestributionName", {
      value: todoWebDestribution.distributionDomainName,
    });
  }
}
