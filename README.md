# OdontoStar - Backend 🦷

API REST do sistema de agendamento odontológico OdontoStar.

## 🔗 Links

- **Backend:** https://odontostar-backend.onrender.com
- **Repositório Frontend:** https://github.com/NatanSantana/odontostar-frontend

---

## ☁️ Hospedagem

O FrontEnd está hospedado no **Vercel**

O backend está hospedado no **Render** no plano gratuito.

> ⚠️ **Atenção:** O servidor entra em modo de hibernação após um período de inatividade. Na primeira requisição após esse período, o servidor pode demorar **1 minuto ou mais** para responder. As requisições seguintes voltam ao normal.
```
---

## 🛠️ Tecnologias

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (autenticação)
- bcrypt (criptografia de senha)
- date-fns (manipulação de datas)
- ts-node (execução TypeScript)

---

## 📡 Endpoints

Base URL: `https://odontostar-backend.onrender.com`

**Usuários:**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/register-user` | Cadastro de usuário | ❌ |
| POST | `/api/login-user` | Login de usuário | ❌ |
| GET | `/api/findBy?cpf=` | Buscar usuário por CPF | ✅ |

**Consultas:**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/registrar-consulta` | Agendar consulta | ✅ |
| GET | `/api/buscar-consultaspendentes` | Listar consultas pendentes | ✅ |
| GET | `/api/buscar-consultasbycpf?cpf=` | Listar consultas por CPF | ✅ |
| POST | `/api/marcar-realizada` | Marcar consulta como realizada | ✅ |
| DELETE | `/api/desmarcar-consulta` | Cancelar consulta | ✅ |

**Dentistas:**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/registrar-dentista` | Cadastrar dentista | ✅ |
| GET | `/api/dentistabycpf?cpf=` | Buscar dentista por CPF | ✅ |

**Datas:**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/lancar-datas` | Lançar data disponível | ✅ |
| GET | `/api/mostrar-datas?especialidade=` | Listar datas por especialidade | ✅ |

**Clima:**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/previsao-clima?dataDesejada=` | Previsão do tempo | ✅ |

> ✅ Requer token JWT no header: `Authorization: Bearer {token}`

---

## 🚀 Como Rodar Localmente

**Pré-requisitos:**
- Node.js instalado
- MongoDB local ou conta no MongoDB Atlas

**Instalação:**
```bash
cd backend
npm install
npm run dev
```

O backend estará disponível em `http://localhost:3080`.

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend:

```
MONGO_URI=sua_connection_string
PORT=3080
SECRET_JWT=sua_chave_secreta
OPEN_WEATHER_KEY=sua_chave_openweather
```

---

## 📁 Estrutura do Projeto

```
backend/
├── controller/       # Handlers das requisições HTTP
├── models/           # Schemas do Mongoose
├── routes/           # Rotas do Express
├── service/          # Regras de negócio
├── middleware/       # Autenticação JWT
└── server.ts         # Entrada da aplicação
```

---