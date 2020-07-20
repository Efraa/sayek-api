import WinstonSlackHook from 'winston-slack-webhook-transport'

const slackOptions: any = {
  webhookUrl: process.env.SLACK_WEBHOOK,
  formatter: data => ({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            data.level === 'error'
              ? ':sos: :fire: *EXCEPTION, UNEXPECTED ERROR* :fire: :sos:'
              : ':information_source: *INFORMATION*',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            data.level === 'error'
              ? ':fire: Hi Team, we have problems, an uncontrolled error has occurred in API Server, this is what happened: :fire:'
              : ':coffee: Hi Team, we have a bit of movement in API Server, this is what happened:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            data.level === 'error'
              ? `*ERROR: * ${data.message}`
              : `*MESSAGE: * ${data.message}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Environment: ${
              process.env.NODE_ENV && process.env.NODE_ENV
            }`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `At ${new Date()}`,
          },
        ],
      },
    ],
  }),
}
// @ts-ignore
export const SlackHook: TransportStream = new WinstonSlackHook(slackOptions)
