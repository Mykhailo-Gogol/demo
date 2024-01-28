import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { ImageProps } from 'next/image'

export interface FeatureType {
  src: ImageProps['src']
  slug: string
  title: string
  subtitle: string
  callToActionText: string
  tags: string[]
  label: string
  settings: {
    model: string
    prompt?: string
    temperature: number
    max_tokens: number
    top_p: number
    frequency_penalty: number
    presence_penalty: number
    stop?: string[]
  }
  collapsedMode?: boolean
}

export interface AppConfigType {
  iconSize: FontAwesomeIconProps['size']
  iconWidth: FontAwesomeIconProps['width']
  iconHeight: FontAwesomeIconProps['height']
  defaultTheme: string
}
