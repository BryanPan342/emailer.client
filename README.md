# Emailer - Internal Emailing Client

This repository hosts Creative Lab's homegrown emailing client.

## Getting Started

Starting up is simple. Run:

```
git clone https://github.com/UCLA-Creative-Labs/emailer.git
npm install
```

## Templates

In order to use this client. You must first create a template for the
email you want to send out. All these templates must go in the `emails/`
directory.

Each email must have **two** templates:
- `[template-name]-subject.txt` (subject line)
- `[template-name]-text.txt` (email body)

Template names should be organized in the following matter:

```
[subject]-[year]-[quarter]-[type].txt
```

For example, if we have Project Lead Applications for the Fall 2020 quarter,
our template name would be: `plead-2020-fall`. Resulting in two files in the
`emails/` directory:
- `plead-2020-fall-subject.txt`
- `plead-2020-fall-text.txt`

### Personalize

You can personalize emails by adjusting the `personalize` function.

Currently, if you have the word `NAME` anywhere in the email body template,
`Emailer` will replace it with the first name of the individual.

## Integration Test

**Always** run an integration test before sending out a mass emails.

To run an integration test:
- [ ] make sure the `template_name` variable is equal to `[template-name]`
- [ ] make sure the `test` variable is set to true.
- [ ] run `yarn start`


## Mass Email Work Flow

- [ ] Check/Update Email List such that the first sheet has the write emails.
- [ ] Write up templates
  - [ ] Subject Line: `emails/[template-name]-subject.txt`
  - [ ] Email Body: `emails/[template-name]-text.txt`
- [ ] Update the `template_name` variable is equal to `[template-name]`
- [ ] Run integration test through `yarn start`
- [ ] Check the Creative Labs gmail to check the email
- [ ] Set `test` variable to `false`
- [ ] Let the dogs out!!! Run: `yarn start`

## Clean Up Work Flow
- [ ] Set `template_name` back to `hello-world`
- [ ] Set `test` variable back to `true`
- [ ] Save your template and push:
`git add emails/* && git commit -m "new template" && git push`