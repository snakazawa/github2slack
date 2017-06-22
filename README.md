# github2slack

[![Build Status](https://travis-ci.org/snakazawa/github2slack.svg?branch=master)](https://travis-ci.org/snakazawa/github2slack)
[![Code Climate](https://codeclimate.com/github/snakazawa/github2slack/badges/gpa.svg)](https://codeclimate.com/github/snakazawa/github2slack)
[![Dependency Status](https://gemnasium.com/badges/github.com/snakazawa/github2slack.svg)](https://gemnasium.com/github.com/snakazawa/github2slack)

Simply and customizable GitHub-Slack notifier. 

GitHubの通知をSlackに飛ばす通知システムです。  
シンプルかつカスタマイズ性が高いのが特徴です。


## Serializer Packages

### DefaultSerializer

Simple English serializer

Support events:

- [x] IssuesEvent
- [x] IssueCommentEvent
- [x] GollumEvent
- [ ] CommitCommentEvent
- [ ] PushEvent
- [ ] CreateEvent
- [ ] DeleteEvent
- [ ] LabelEvent
- [ ] MilestoneEvent
- [ ] ProjectCardEvent
- [ ] ProjectColumnEvent
- [ ] ProjectEvent
- [ ] PullRequestEvent
- [ ] PullRequestReviewEvent
- [ ] PullRequestReviewCommentEvent


### JpnSerializer

Japanese serializer

Support events:

- [x] IssuesEvent
- [x] IssueCommentEvent
- [x] GollumEvent
- [ ] CommitCommentEvent
- [ ] PushEvent
- [ ] CreateEvent
- [ ] DeleteEvent
- [ ] LabelEvent
- [ ] MilestoneEvent
- [ ] ProjectCardEvent
- [ ] ProjectColumnEvent
- [ ] ProjectEvent
- [ ] PullRequestEvent
- [ ] PullRequestReviewEvent
- [ ] PullRequestReviewCommentEvent


## Requirements

- node: ~8.1.2
- git (and authenticated user)


## Install

**TODO**


## Environment

**TODO**


## Development

### Class Diagram

![Class Diagram](documents/class.png "Class Diagram")

(generated by PlantUML)

**TODO**
