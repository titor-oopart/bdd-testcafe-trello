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

# 🐳 TestCafe BDD Multi-Browser Docker Image

This Docker image provides a complete environment for running **TestCafe + Gherkin BDD tests** on multiple browsers in headless mode, including:

- **Firefox ESR**
- **Google Chrome**
- **Chromium**
- **Microsoft Edge**

It is designed for CI/CD pipelines or local execution where a reliable and reproducible browser-testing setup is required.

---

## 🚀 Features

- Preinstalled browsers: Chrome, Chromium, Firefox ESR, Microsoft Edge
- Custom Chrome policies for local network access
- Pre-cloned TestCafe BDD project from GitHub
- Automatic branch checkout and update on container start
- Fully headless execution
- Lightweight base image: `node:20-bullseye-slim`

---

## 🛠️ What's Included in the Image

### Installed System Tools

- `git`, `curl`, `wget`, `sudo`
- Browser-related dependencies
- Google Chrome Stable
- Firefox ESR
- Microsoft Edge Stable

### Installed Node Modules

- Project dependencies are installed automatically via `npm install`.

---

## 📦 How to Build the Image

```bash
docker build -t testcafe-bdd .
```

---

## Authentication Requirement & Browser Compatibility Overview

Before running the automated tests, you must manually log in to Trello at least once. Trello applies an email-based two-factor authentication (2FA) challenge when a new device or environment tries to sign in. Since each Docker container is treated as a new device, the first login attempt may require this verification step.

### Browser Behavior (Headless vs Normal Mode)

All browsers can run the tests in both headless and normal mode, except for one specific case:

- Chrome **fails in headless mode** because it cannot process the 2FA challenge required by Trello.
- Chrome **works normally in non-headless mode**, allowing you to complete the 2FA step.
- Firefox (headless and normal) works after the first successful login.
- Edge and Chromium behave normally in both modes once the login is trusted.

### Summary Table

| Browser  | Headless Mode                               | Normal Mode       |
| -------- | ------------------------------------------- | ----------------- |
| Chrome   | ❌ Cannot run tests due to 2FA restrictions | ✔️ Works normally |
| Firefox  | ✔️ Works after first manual login           | ✔️ Works normally |
| Chromium | ✔️ Works after first manual login           | ✔️ Works normally |
| Edge     | ✔️ Works after first manual login           | ✔️ Works normally |

In summary, the only limitation is that Chrome cannot run the authentication flow in headless mode due to Trello's 2FA requirements. All other browsers and modes function correctly once the initial login is completed.

## ▶️ How to Run Tests

You can run the container with environment variables directly or via an env file.

### 1) Using `docker run` with `-e` environment variables

```bash
docker run --rm \
  -e BROWSER=chrome \
  -e GIT_BRANCH=develop \
  testcafe-bdd
```

### 2) Using `--env-file` (recommended)

Create an env file, e.g. `.env`, check the file .env.example:

```env
BROWSER=firefox
GIT_BRANCH=develop
API_URL=http://localhost:3000
OTHER_SECRET=secret-value
```

Run:

```bash
docker run --env-file .env -e BROWSER=chrome -e GIT_BRANCH=dockerfile -it testcafe-bdd
```

---

## 🔧 Environment Variables

| Variable     | Description                                              | Default   |
| ------------ | -------------------------------------------------------- | --------- |
| `BROWSER`    | Browser to use (`chrome`, `chromium`, `edge`, `firefox`) | `firefox` |
| `GIT_BRANCH` | Git branch to pull before running tests                  | `develop` |
| `API_URL`    | Optional API endpoint for the test suite                 | —         |
| Other vars   | Any variables required by your test suite                | —         |

---

## 📁 Directory Structure

Inside the container:

```
/app
  ├── features/
  ├── api
  ├── package.json
  └── testcafe config files
```

The project is cloned from:

```
https://github.com/titor-oopart/bdd-testcafe-trello.git
```

---

## ⚙️ Container Startup Behavior

At container startup, the following occurs:

1. Pull the latest changes from the selected branch
2. Checkout that branch
3. Run TestCafe in headless mode:

```bash
npx gherkin-testcafe ${BROWSER}:headless features/
```

---

## 🔐 Security Notes

- Do **not** store secrets inside the image; use `--env-file`, Docker secrets, or CI secret storage.
- Add `.env` files to `.gitignore`.
- If accessing local services (e.g., `localhost:3000`), configure networking properly. Consider `--network host` only for local debugging.

---

## 📜 Chrome Policy Configuration

Chrome is configured to allow local network access:

- `trello.com`
- `atlassian.com`
- `http://localhost:3000`

Useful for bypassing internal restrictions during automation.

---
