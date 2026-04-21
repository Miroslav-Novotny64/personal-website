import { useTranslations } from "next-intl";
import { NotFoundUI } from "@/components/not-found-ui";

export default function CatchAll() {
  const t = useTranslations("NotFound");
  
  return (<NotFoundUI
        heading={t("heading")}
        subheading={t("subheading")}
        description={t("description")}
      />)
}
