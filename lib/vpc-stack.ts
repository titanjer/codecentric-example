import * as ec2 from '@aws-cdk/aws-ec2'
import { SecurityGroup } from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export class VpcStack extends cdk.Stack {

  readonly vpc: ec2.Vpc;
  readonly ingressSecurityGroup: ec2.SecurityGroup;
  readonly egressSecurityGroup: ec2.SecurityGroup;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.vpc = new ec2.Vpc(this, 'CustomVPC', {
        cidr: '10.0.0.0/16',
        maxAzs: 2,
        subnetConfiguration: [{
            cidrMask: 26,
            name: 'isolatedSubnet',
            subnetType: ec2.SubnetType.ISOLATED,
        }],
        natGateways: 0,
    })

    this.ingressSecurityGroup = new SecurityGroup(this, 'IngressSG', {
      vpc: this.vpc,
      allowAllOutbound: false,
      securityGroupName: 'IngressSG'
    })
    this.ingressSecurityGroup.addIngressRule(ec2.Peer.ipv4('10.0.0.0/16'), ec2.Port.tcp(3306))

    this.egressSecurityGroup = new SecurityGroup(this, 'EgressSG', {
      vpc: this.vpc,
      allowAllOutbound: false,
      securityGroupName: 'EgressSG'
    })
    this.egressSecurityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80))
  }
}
