import { hash } from '@node-rs/bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const ADMIN_USERNAME = 'admin';
const ADMIN_NICKNAME = 'Ivy-Rong';
const ADMIN_PASSWORD = '123456';

async function main() {
  const adminUserInfo = Prisma.validator<Prisma.UserCreateInput>()({
    username: ADMIN_USERNAME,
    nickName: ADMIN_NICKNAME,
    password: await hash(ADMIN_PASSWORD),
    enabled: true,
  });

  const adminUser = await prisma.user.findUnique({
    where: {
      username: ADMIN_USERNAME,
    },
  });

  if (!adminUser) {
    await prisma.user.create({
      data: {
        ...adminUserInfo,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
