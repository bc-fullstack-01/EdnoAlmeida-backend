# Setup para Projeto Express.js com Typescript

## Libs Principais
<ul>
<li>Express and @types/express | framework web e suas tipagens</li>
<li>ts-node-dev | Hot-refrsh para typscript</li>
<li>jest | Lib para testes</li>
<li>typescript</li>
<li>cors</li>
</ul>


## API
<ul>
<li>HTTPS</li>
<li>JWT | Implementar</li>
</ul>

## GitActions
<ul>
<li>Execução de teste | Implementar</li>
<li>Verificação de código estático | Implementar</li>
</ul>

# Futuras implementações:
## Testes
## ORM 


# Execução:
## Código para o setup
```
cd backend
```

## Código para criar as chaves para o HTTPS e Liberar o acesso a elas
```
make generate_keys_https
sudo chown $(whoami) $PWD -R
```

## Código para rodar o servidor no docker
```
make run_dockercompose
```


