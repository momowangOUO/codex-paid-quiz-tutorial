function createCollaborationContactForm() {
  const form = FormApp.create('Codex 付费网站教程：合作与交流表单');

  form.setDescription('如果你想协作翻译、补充平台经验、分享案例或讨论合作，请填写这份表单。请不要提交 API key、Webhook secret、付款账户截图或任何用户隐私资料。');
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('已收到，谢谢你。若内容适合进一步交流，我会再回复。');

  form.addTextItem()
    .setTitle('你的称呼或团队名称')
    .setHelpText('可以填写昵称、公司名或项目名。')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('你想讨论什么？')
    .setHelpText('请用 3-5 句话说明你的想法、问题或合作方向。')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('主题类型')
    .setChoiceValues(['教程协作', '翻译协作', '平台部署经验', '支付 / Webhook 经验', '案例分享', '其他'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('你愿意如何参与？')
    .setChoiceValues(['提供反馈', '补充教程', '协助翻译', '分享案例', '技术合作', '其他'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('公开链接（可选）')
    .setHelpText('例如 GitHub、作品集、产品页或公开文章。请不要填写私密链接。')
    .setRequired(false);

  form.addTextItem()
    .setTitle('希望如何联系你？')
    .setHelpText('请填写你愿意公开给表单作者看的联系方式，例如邮箱或社群账号。')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('补充说明')
    .setHelpText('请不要放 API key、付款资料、用户数据或敏感截图。')
    .setRequired(false);

  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
}
