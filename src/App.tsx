import { useSelector } from "react-redux"
import { Calendar } from "./components/Calendar/Calednar"
import { CurrentDay } from "./components/CurrentDay/CurrentDay"
import { Header } from "./components/Header/Header"
import { RootState } from "./store"

function App() {
  const calendarIsOpen = useSelector<RootState, boolean>(state => state.calendarIsOpen);
  return (
    <div>
      <Header />
      <CurrentDay />
      {calendarIsOpen && (
        <Calendar />
      )}
    </div>
  )
}

export default App
