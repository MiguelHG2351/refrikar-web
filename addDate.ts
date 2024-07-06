const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function actualizarFechaUsuarios() {
  let detalleDate = new Date(2024, 5, 1); // 1 de abril de 2024

  const usuarios = await prisma.egresos.findMany();

  for (const usuario of usuarios) {
    await prisma.egresos.update({
      where: { egresoid: usuario.egresoid },
      data: { fecha: detalleDate },
    });
    detalleDate = new Date(detalleDate.setDate(detalleDate.getDate() + 1));
  }
}

console.log('here')
actualizarFechaUsuarios()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
