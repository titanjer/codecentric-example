#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CodecentricExampleStack } from '../lib/codecentric-example-stack';

const app = new cdk.App();
new CodecentricExampleStack(app, 'CodecentricExampleStack');
