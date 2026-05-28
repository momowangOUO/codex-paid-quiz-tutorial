function createCollaborationContactForm() {
  const form = FormApp.create("Codex 付费网站教程｜合作与案例交流");

  form.setDescription(
    "请简短说明你想做的产品、目前卡点和希望交流的方向。不要提交 API key、付款后台截图、订单资料或用户隐私资料。"
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage("已收到，谢谢。若主题适合进一步交流，我会再回复你。");

  form.addTextItem()
    .setTitle("你的称呼或团队名称")
    .setHelpText("可填写昵称、团队名或公司名。")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("你想交流或合作的主题")
    .setHelpText("请用 3-5 句话说明你想做什么。")
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle("目前进度")
    .setChoiceValues(["想法阶段", "正在开发", "已经上线", "想优化现有产品", "其他"])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle("你希望得到什么帮助")
    .setChoiceValues(["技术建议", "案例交流", "共创合作", "访谈或内容合作", "教程补充", "其他"])
    .setRequired(true);

  form.addTextItem()
    .setTitle("可公开查看的网址或 GitHub 仓库")
    .setHelpText("没有可以留空。请不要放后台网址或带权限的链接。")
    .setRequired(false);

  form.addTextItem()
    .setTitle("你愿意留下的回复方式")
    .setHelpText("请填写你愿意被联系的方式。这个字段只进入表单后台，不会写进 GitHub。")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("补充说明")
    .setHelpText("如果有时间安排、预算范围、希望合作方式等，可以写在这里。")
    .setRequired(false);

  Logger.log("公开填写链接：" + form.getPublishedUrl());
  Logger.log("表单编辑链接：" + form.getEditUrl());
}
