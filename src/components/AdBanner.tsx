import { useEffect } from 'react'

const AdBanner = (props: JSX.IntrinsicElements['ins']) => {
  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <ins
      // @ts-ignore
      class="adsbygoogle"
      style={{
        display: 'block',
        overflow: 'hidden',
        marginTop: '50px',
        marginBottom: '50px',
      }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || ''}
      data-ad-slot="9879226925"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    ></ins>
  )
}
export default AdBanner
