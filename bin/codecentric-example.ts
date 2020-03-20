import * as cdk from '@aws-cdk/core'
import 'source-map-support/register'
import { VpcStack } from '../lib/vpc-stack'

const env = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
}

const appName = 'CCEX-'

const app = new cdk.App()
new VpcStack(app, appName + 'VpcStack', { env })

app.synth()