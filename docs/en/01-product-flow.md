# 01. How to break down the product process

![Product flow chapter art](../../assets/chapters/chapter-01-flow.webp)
**[Core of this chapter] Before writing code, first clearly break down "which pages the user will see, what each step does, and which step requires a backend." **

Before you start writing code, you only need to answer one question:

```text
What screens will users go through from entering the site to paying to unlock?
```This chapter will not talk about the architecture diagram, but first break the product into small tasks that Codex can understand.

> 💡 **Why do this#  **
> Codex requires clear task boundaries. The product process is like a road map: first know where users come in, where they answer questions, where they pay, and where they read reports, so that when writing code later, you won’t make up for it here and there.

## First draw the shortest user path

**[Core of this section] First write the shortest route for users from the home page to the complete report. **

The shortest path to a paid quiz site is:

```text
Home page
  -> Answer page
  -> Free introductory report
  -> Payment page
  -> Full report
  -> Save or open report again
```You don't need to log in yet. The most important thing about low-priced one-time reports is to reduce friction.

> 💡 **Why do this#  **
> Login, membership, backend, and discount codes can all be added later. The first version first allows users to complete a complete purchase, just like confirming that the counter can really collect money before decorating more shelves.

## What to do on each page

**[Core of this section] Each page is only responsible for one main task to avoid the first version becoming too heavy. **

### Home

The homepage is only responsible for getting users started.

Need to have:

- One sentence describing what problem this quiz helps users solve.
- Start button.
- Optional: language switching, case entry.

Don’t write “pay to unlock” or “buy now” at the beginning. Users haven’t invested time yet, and withdrawing money too early will reduce the completion rate.

### Answer page

The answer page is only responsible for allowing users to complete the questions.

Need to have:

- Current question number.
- Question.
- Options.
- Previous question/Next question.
- Progress prompts.
- Pictures or visual aids.

Newbies are advised to do a 5-question test version first, and then expand it to 48 questions after the process is passed.

### Free Introduction Report

The free version is not meant to titillate, nor is it empty talk. It makes users think you are professional.

Can display:

- Core psychological drivers.
- Behavioral tendencies and potential stuck points.
- The gap between self-perception and external performance.
- Which directions will the full report continue to analyze.

Don't show:

- Complete Career Answers.
- Full path.
- Detailed action plan.
- Full report that can be saved.

### Paywall

Paywalls only allow users to pay.

Need to have:

- Current price.
- A clear payment button.
- Automatically unlock instructions after payment.
- Payment failed or pending status.

Don’t cram too many payment method buttons at once. The backend can recommend an entrance based on the region.

### Full report

The complete report should make users feel that "this is not just a random piece of text".

Can contain:

- Career Radar.
- Psychological profiling.
- Suitable career type.
- Multiple development routes.
- Risk boundaries.
- Alternate directions.
- Save the report.

## Submit the form to Codex

**[Core of this section] Organize the pages, user actions, and back-end participation methods into a table, and then submit it to Codex. **

Organize your product process into this table and post it to Codex:

| Page | What users see | What users can do | Should the backend be involved |
| --- | --- | --- | --- |
| Home | Product Description, Start Button | Start Quiz | Not Required |
| Answer page | Questions and options | Answer, next question | Not required unless you want to save it in real time |
| Free report | Partial analysis, unlock button | Click to pay | Need to create payment session |
| Paddle checkout | Payment form | Payment | Paddle processing |
| Full report | All analysis | View, save | Requires verification access token |

## What is reportId?
**【Core of this section】`reportId` is the number of a certain test report. **

`reportId` is the number of a report.

After the user answers the question, the front end or the back end generates a `reportId`, and all subsequent actions revolve around it:

```text
This answer -> reportId
This order -> reportId
Unlock this time -> reportId
This full report -> reportId
```Without `reportId`, the payment platform tells you "someone paid" and you don't know which report to unlock.

> 💡 **Why do this#  **
> `reportId` is like the pickup number. When a user orders a meal, pays for it, and comes back to pick up the meal, the same number must be used to correspond to the same content.

## What is payment session?
**[Core of this section] `payment_session` is a record of a certain payment attempt. **

`payment_session` is a payment attempt.

A user might:

- Click to pay but close the page.
- Payment failed.
- Retry payment.
- The payment was successful but the front end did not jump back.

So don't just rely on front-end state. Backend to save:```json
{
  "sessionId": "pay_xxx",
  "reportId": "rep_xxx",
  "provider": "paddle",
  "providerOrderId": "txn_xxx",
  "status": "pending"
}
```After successful payment, change to:```json
{
  "status": "paid",
  "paidAt": "2026-05-28T00:00:00.000Z"
}
```

> 💡 **Why do this#  **
> A report may have multiple payment attempts. The user may close the payment page for the first time, but succeed the second time. `payment_session` can record these attempts separately to avoid status confusion.

## What is access token?
**【Core of this section】`accessToken` is the key to open the complete report after successful payment. **

`accessToken` is the key to complete reporting.

After the payment is successful, the backend sends an unguessable token to the report. The next time the user comes back, the front end will ask the back end with the token:

```text
Does this token have permission to view the report reportId?
```The full report will be displayed only after the backend says yes.

> 💡 **Why do this#  **
> You should not only rely on "someone has paid for this reportId" to display the complete report, otherwise others may be able to view the same reportId. `accessToken` is like an exclusive key, only the person with the key can open it.

## You can do nothing in the first version

**【Core of this Section】The first version only retains one-time payment to unlock, and if you don’t do complex functions that will slow down the launch. **

In order to go online faster, you can skip the first version:

- User registration.
- Backend CMS.
- Discount code.
- Subscribe.
- Complex database.
- Automatic emails.
- Multiple product packages.

You first need to make a one-time payment to unlock it, and then add more slowly.

> 💡 **Why do this#  **
> What needs to be verified most in the early stages of the product is "Is anyone willing to complete the test and pay# " It is more valuable to run through this main line first than to do many peripheral functions at the beginning.

## Product process prompts for Codex

**[Core of this section] Turn the already dismantled product process directly into prompt words that can be executed by Codex. **

Copy this:

```text
I want to make a quiz site that unlocks reports for a one-time fee.

Please design the code according to this user path:
Home -> Answer Page -> Free Introduction Report -> Payment -> Full Report

For the first version, no login, no subscription, no discount code is required.

Please help me design:
1. Front-end page status
2. How to generate and save reportId
3. payment session data structure
4. access token unlocking logic
5. Mock payment test process

Please output the file plan first, and then implement the minimum version.
```

## Completion criteria for this chapter

**【Core of this Section】After completing this chapter, you should be able to explain the entire paid unlocking process in Mandarin. **

When finished you should be able to clearly say:

- Which pages users go through.
- Which step requires backend.
- Why can't we just rely on the front end to determine that payment has been made?
- What are `reportId`, `payment_session`, and `accessToken` responsible for?
The next chapter will start making Codex actually write code.