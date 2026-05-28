# 03. GitHub にアップロードする

![チュートリアルのトップページ](../../assets/screenshots/00-tutorial-home.png)


Zeabur は GitHub のコードからデプロイします。push 前に secret と生成物を除外します。

```bash
git status
git add .
git commit -m "Initial paid website"
git push -u origin main
```
