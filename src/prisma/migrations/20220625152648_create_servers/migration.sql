-- CreateTable
CREATE TABLE "servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "icon_url" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
