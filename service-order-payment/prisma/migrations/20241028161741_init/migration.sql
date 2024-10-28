-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "snap_url" TEXT,
    "metadatra" JSONB,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment_logs" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "raw_response" JSONB NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Payment_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment_logs" ADD CONSTRAINT "Payment_logs_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
