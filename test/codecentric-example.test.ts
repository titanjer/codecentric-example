import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import CodecentricExample = require('../lib/codecentric-example-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CodecentricExample.CodecentricExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
