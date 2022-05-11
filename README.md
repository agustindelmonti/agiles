### Local development

```console
$ yarn install
$ yarn run test
```

### Docker

Para construir la imagen

```console
$ docker build . -t wordle
```

Para correr la imagen en modo interactivo

```console
$ docker run -p 3000:3000 -it --rm --name wordle wordle
```
