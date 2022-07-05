# Setup para Projeto Express.js com Typescript

## Libs Principais
<ul>
<li>Express and @types/express | framework web e suas tipagens</li>
<li>ts-node-dev | Hot-refrsh para typscript</li>
<li>jest | Lib para testes</li>
<li>typescript</li>
<li>cors</li>
</ul>

# Futuras implementações:
## Arquitetura MVC
## Testes
## ORM 

## API
<ul>
<li>HTTPS</li>
<li>JWT</li>
</ul>

## GitActions
<ul>
<li>Execução de teste</li>
<li>Verificação de código estático</li>
</ul>

# Execução:
## Codigo fazer o setup
```
cd backend
```

## Codigo para criar as chaves para o HTTPS e Liberar o acesso a elas
```
make generate_keys_https
sudo chown $(whoami) $PWD -R
```

## Codigo para rodar o servidor no docker
```
make run_dockercompose
```


