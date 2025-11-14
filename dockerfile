FROM node:20-bullseye-slim

# Update apt and install essential tools for debugging
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    gnupg \
    git \
    curl \
    wget \
    sudo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Firefox and other dependencies separately for better error tracking
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    firefox-esr \
    chromium \
    libdbus-glib-1-2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

# Add Chrome policies
RUN mkdir -p /etc/opt/chrome/policies/managed && \
    cat <<EOF > /etc/opt/chrome/policies/managed/local_network.json
{
  "LocalNetworkAccessAllowedForUrls": [
    "[*.]trello.com",
    "http://localhost:3000",
    "[*.]atlassian.com"
  ]
}
EOF
# RUN mkdir -p /etc/opt/chrome/policies/managed/
# RUN echo {' \
#   "LocalNetworkAccessAllowedForUrls": [ \
#   "[*.]trello.com", \
#   "http://localhost:3000", \
#   "[*.]atlassian.com" \
#   ] \
#   '} > /etc/opt/chrome/policies/managed/local_network.json

# Install edge browser
RUN curl -fSsL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | sudo tee /usr/share/keyrings/microsoft-edge.gpg > /dev/null
RUN echo 'deb [signed-by=/usr/share/keyrings/microsoft-edge.gpg] https://packages.microsoft.com/repos/edge stable main' | sudo tee /etc/apt/sources.list.d/microsoft-edge.list
RUN apt-get update && apt-get -y --no-install-recommends install microsoft-edge-stable

WORKDIR /app
ENV GIT_BRANCH=develop
RUN git clone --branch ${GIT_BRANCH} https://github.com/titor-oopart/bdd-testcafe-trello.git /app
RUN cd /app
RUN npm install
ENV BROWSER=firefox
CMD ["sh","-c", "npx gherkin-testcafe ${BROWSER}:headless features/"]

