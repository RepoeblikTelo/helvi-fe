"use client";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createNewWasteExchange } from "@/actions/wasteExchangeAction";
import { createNewWasteReport } from "@/actions/wasteReportAction";

const formSchema = z.object({
  location: z.string(),
  // image: z.string().min(2, {
  //   message: "Image must be at least 2 characters.",
  // }),
});

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin-post" },
  { title: "Laporan Sampah", link: "/admin-post/waste_exchanges" },
  {
    title: "Buat Laporan Sampah",
    link: "/admin-post/waste_exchanges/create",
  },
];

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const waste = await createNewWasteReport(values.location);

    if (waste) {
      toast.success("Berhasil");

      setTimeout(() => {
        router.push("/user/waste_reports");
      }, 2000);
    }
  }
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Tambah Laporan Sampah`}
            description="Masukkan data sesuai dengan form."
          />
        </div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi Sampah</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
