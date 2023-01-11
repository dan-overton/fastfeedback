import Feedback from "@/components/feedback"
import { useAuth } from "@/lib/auth"
import { createFeedback } from "@/lib/db"
import { getAllFeedback, getAllSites } from "@/lib/db-admin"
import { Box, Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

export async function getStaticPaths(context) {
  const { sites } = await getAllSites()

  const siteIds = sites.map((s) => s.id)

  return {
    paths: siteIds.map((siteId) => ({
      params: {
        siteId
      }
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const siteId = context.params.siteId

  const { feedback: initialFeedback } = await getAllFeedback(siteId)

  return {
    props: {
      initialFeedback
    }
  }
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth()
  const router = useRouter()
  const inputRef = useRef()

  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = async (e) => {
    e.preventDefault()

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputRef.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      rating: 5,
      status: 'pending'
    }

    const { id } = await createFeedback(newFeedback)
    setAllFeedback((existing) => [{ ...id, ...newFeedback }, ...existing])

  }

  return (
    <Flex direction="column" width="full" maxWidth="700px" margin="0 auto">
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input id="comment" ref={inputRef} type='text' mb={2} />
          <Button fontWeight="medium" type="submit">Add Comment</Button>
        </FormControl>
      </Box>
      {allFeedback.map(feedback => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Flex>)
}
