# bdd-testcafe-trello

bdd-testcafe-trello

## Permitir acceso a la red local en Chrome (Linux)

Cuando se ejecutan tests con TestCafe y Trello, Chrome puede bloquear solicitudes a la red local. Para evitarlo, aplica la política `LocalNetworkAccessAllowedForUrls`:

### 1️⃣ Crear el archivo de política

```bash
sudo nano /etc/opt/chrome/policies/managed/local_network.json
```

```json
{
  "LocalNetworkAccessAllowedForUrls": [
    "[*.]trello.com",
    "http://localhost:3000",
    "[*.]atlassian.com"
  ]
}
```
