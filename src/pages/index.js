import React from "react";
import FormSection from "@/components/FormSection";
import InfoSection from "@/components/InfoSection";
import OptionSection from "@/components/OptionSection";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function Home() {

    return (
        <>
            <CssBaseline/>
            <InfoSection />
            <OptionSection />
            <FormSection />
        </>
    );
}

