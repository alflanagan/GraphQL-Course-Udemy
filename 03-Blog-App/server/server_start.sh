#! /bin/bash

npx prisma generate
npx prisma db push
npx prisma studio &
npm run start:dev
