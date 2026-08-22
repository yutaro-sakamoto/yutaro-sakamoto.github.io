---
title: "PureScript環境構築用Dockerfile"
description: "PureScriptのコンパイラ purs とビルドツール spago が使える状態になるDockerfileを用意しました。"
pubDate: 2021-03-22
tags: ["PureScript", "Docker"]
---

PureScriptの環境構築に苦戦することが多いためDockerfileを作成しました。
ビルドすれば `purs` (コンパイラ) と `spago` (ビルドツール) が使える状態になっています。
Dockerfileの中で `apt` を使うのは非推奨らしく、今後できれば対応したいです。

この記事の執筆時点でのDockerfileを下記に示しますが、更新は
[Dockerfileの置いてあるGitHubリポジトリ yutaro-sakamoto/purescript-dockerfile](https://github.com/yutaro-sakamoto/purescript-dockerfile)
に対してだけ反映するつもりです。

```dockerfile
FROM ubuntu:20.04
LABEL maintainer="yutaro-sakamoto@yutaro-sakamoto.com"

RUN apt update -y
RUN apt upgrade -y
RUN apt install -y tzdata
RUN apt install -y nodejs npm git libncurses5

# install psvm
RUN npm install -g psvm

# install purs
RUN psvm install v0.14.0
RUN psvm use v0.14.0
RUN echo 'export PATH="$PATH:/root/.psvm/current/bin/"' >> ~/.bashrc

# install spago
RUN npm install -g spago

ENTRYPOINT ["/bin/bash"]
```
