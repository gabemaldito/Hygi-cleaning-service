# Hygi - Serviços de Limpeza Premium

Bem-vindo ao repositório do **Hygi**, um aplicativo MVP para conectar clientes a profissionais de limpeza qualificados. Este projeto foi desenvolvido utilizando React Native, Expo e TypeScript.

## 🚀 Funcionalidades

### Cliente
- **Explorar Serviços**: Visualização de lista de serviços disponíveis (Faxina Padrão, Pesada, Pós-Obra, Passadoria).
- **Agendamento**: Fluxo completo de agendamento com seleção de data, horário e endereço.
- **Pagamento Simulado**: Interface de checkout com cartão de crédito (simulação).
- **Meus Agendamentos**: Acompanhamento do status dos serviços solicitados (Pendente, Aceito, Concluído).

### Profissional
- **Painel de Oportunidades**: Visualização de novos trabalhos disponíveis na região.
- **Aceite de Serviços**: Funcionalidade para aceitar trabalhos e preencher a agenda.
- **Minha Agenda**: Lista consolidada dos serviços aceitos e programados.

## 🛠 Tech Stack

- **React Native** (0.76)
- **Expo** (SDK 52)
- **Expo Router** (Navegação baseada em arquivos)
- **TypeScript**
- **Context API** (Gerenciamento de estado global para Auth e Dados Mockados)

## 📱 Como Rodar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou
   npx expo start
   ```

3. **Abra no seu dispositivo:**
   - **Android**: Pressione `a` no terminal (requer Android Studio/Emulator) ou escaneie o QR Code com o app Expo Go.
   - **iOS**: Pressione `i` no terminal (requer Xcode/Simulator) ou escaneie o QR Code com o app Expo Go.
   - **Web**: Pressione `w` no terminal para abrir no navegador.

## 🔐 Autenticação (Modo de Teste)

O aplicativo utiliza um sistema de autenticação simulado para facilitar os testes do MVP. O tipo de usuário é determinado pelo e-mail inserido no login:

- **Login como Cliente**:
  - Use qualquer e-mail comum.
  - Exemplo: `cliente@teste.com`
  - Senha: qualquer senha (min 6 caracteres).

- **Login como Profissional**:
  - Use um e-mail contendo a palavra **"pro"**.
  - Exemplo: `pro@servicos.com`
  - Senha: qualquer senha (min 6 caracteres).

## 📂 Estrutura de Pastas

- `app/`: Rotas e telas do Expo Router (Client, Auth, Professional).
- `components/`: Componentes reutilizáveis de UI.
- `context/`: Provedores de estado global (`AuthContext`, `DataContext`).
- `theme/`: Tokens de design (Cores, Tipografia, Espaçamento).
- `assets/`: Imagens e ícones estáticos.

---

**Nota:** Este é um MVP e utiliza dados mockados (em memória). Ao recarregar o aplicativo, os dados de agendamentos criados serão resetados para o estado inicial.
