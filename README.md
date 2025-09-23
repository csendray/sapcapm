# projNode (nodeThree)

A lightweight Node.js app deployed on **SAP BTP Cloud Foundry Trial**.

---

## 📖 Table of Contents

- [About](#about)  
- [Features](#features)  
- [Setup / Installation](#setup--installation)  
- [Usage](#usage)  
- [Cloud Foundry Deployment](#cloud-foundry-deployment)  
- [Manifest & Configuration](#manifest--configuration)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)

---

## About

This project demonstrates how to build and deploy a minimal Node.js application on SAP BTP Cloud Foundry (Trial).  
It is optimized for **trial resource limits**, avoiding common errors such as:

- `InsufficientResources`  
- `insufficient resources: containers`

---

## Features

- Node.js + Express minimal server  
- Environment variable–based configuration  
- Trial-safe manifest (small memory/disk footprint)  
- Random route auto-generated for easier deployment

---

## Setup / Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/csendray/projNode.git
   cd projNode
