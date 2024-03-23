import React, { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'

export default function Settings() {
  const [theme, setTheme] = useState<string | null>()

  useEffect(() => {
    themeChange(false)
    setTheme(localStorage.getItem('theme'))
  }, [theme])

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
        <h1 className="mb-4 text-3xl font-bold">Theme</h1>
        <select
          data-choose-theme={theme}
          className="select select-primary w-full"
          onChange={(v) => setTheme(v.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="cyberpunk">Cyber</option>
          <option value="dim">Dim</option>
        </select>
      </div>
    </div>
  )
}
