import { Routes, Route } from "react-router-dom";
import { DEMOS_BASE } from "./lib/components";
import Layout from "./Layout";
import Home from "./pages/Home";
import EntryPage from "./pages/EntryPage";
import GettingStartedPage from "./pages/getting-started/GettingStartedPage";
import ThemeProviderPage from "./pages/getting-started/ThemeProviderPage";
import ButtonPage from "./pages/forms/ButtonPage";
import SliderPage from "./pages/forms/SliderPage";
import RangeSliderPage from "./pages/forms/RangeSliderPage";
import DropdownPage from "./pages/forms/DropdownPage";
import DatePickerPage from "./pages/forms/DatePickerPage";
import DateRangePickerPage from "./pages/forms/DateRangePickerPage";
import RadioGroupPage from "./pages/forms/RadioGroupPage";
import VoiceRecorderPage from "./pages/media/VoiceRecorderPage";
import NotificationPage from "./pages/feedback/NotificationPage";
import ProgressPage from "./pages/feedback/ProgressPage";
import TabsPage from "./pages/layout/TabsPage";
import ModalPage from "./pages/overlay/ModalPage";
import DrawerPage from "./pages/overlay/DrawerPage";
import AccordionPage from "./pages/data-display/AccordionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/entry" element={<EntryPage />} />
      <Route path={DEMOS_BASE} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStartedPage />} />
        <Route path="theme-provider" element={<ThemeProviderPage />} />
        <Route path="button" element={<ButtonPage />} />
        <Route path="slider" element={<SliderPage />} />
        <Route path="range-slider" element={<RangeSliderPage />} />
        <Route path="dropdown" element={<DropdownPage />} />
        <Route path="date-picker" element={<DatePickerPage />} />
        <Route path="date-range-picker" element={<DateRangePickerPage />} />
        <Route path="radio-group" element={<RadioGroupPage />} />
        <Route path="voice-recorder" element={<VoiceRecorderPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="tabs" element={<TabsPage />} />
        <Route path="modal" element={<ModalPage />} />
        <Route path="drawer" element={<DrawerPage />} />
        <Route path="accordion" element={<AccordionPage />} />
      </Route>
    </Routes>
  );
}
