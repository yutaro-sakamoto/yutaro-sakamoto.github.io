---
title: "PureScript + Halogenでマインスイーパを作ってみた"
description: "PureScriptとHalogenでマインスイーパを実装しました。型安全の恩恵と反省点をまとめます。"
pubDate: 2021-04-04
tags: ["PureScript", "Halogen"]
---

とりあえず動くものができてよかったです。

- [こちらから遊べます](/mine-sweeper/)
- [ソースコードはこちら](https://github.com/yutaro-sakamoto/sample-purescript-halogen-mine-sweeper)

開発過程でたくさんコンパイルエラーを出しましたが、コンパイルさえ通ってしまえば実行時エラーが起きることはほぼなかったです。
Type-Safeの恩恵を実感できました。

以下、反省点です。

- Halogen特有の機能はほとんど使用していない。多分Elmと大差ない。
- ソースコードにコメントを記述していない。
- 2次元Arrayを縦横無尽に駆け回る処理をきれいに記述できなかった。なにか良い方法がないかな?
- UIをもう少しきれいにしたかった。
