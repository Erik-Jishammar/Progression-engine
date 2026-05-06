/*
  Warnings:

  - Added the required column `workoutSessionId` to the `SetEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SetEntry" ADD COLUMN     "workoutSessionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SetEntry" ADD CONSTRAINT "SetEntry_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
