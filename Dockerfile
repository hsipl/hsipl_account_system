FROM node:22-alpine3.18

# 設置工作目錄
WORKDIR /hsipl_account_system

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其他文件
COPY . .

# 定義容器啟動時要運行的命令
CMD ["npm", "run", "dev"]

