import { User } from '@supabase/supabase-js'
import { supabase } from '.'

export const getCompletionsBySlug = async (slug: string, user: User | null) => {
  const { data } = await supabase
    .from('completions')
    .select('*')
    .eq('completion_slug', slug)
    .eq('user_id', user?.id)

  return data
}
