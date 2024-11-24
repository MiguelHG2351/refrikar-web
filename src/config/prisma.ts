import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    // log: [
    //   {
    //     emit: 'event',
    //     level: 'query',
    //   }
    // ]
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
// })

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma