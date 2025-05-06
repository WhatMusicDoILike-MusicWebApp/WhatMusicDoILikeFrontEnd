import { useState } from 'react';
import { Card, CardHeader, Separator } from '../../../ui';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/main';
import { Button } from '@/components/ui';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

interface Recommendation {
  title: string;
  artist: string;
}

interface Genre {
  genre: string;
  explanation: string;
}

export const InsightsContent = (): JSX.Element => {
  const { userId } = useAuth();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(false);
  const [isGenresLoading, setIsGenresLoading] = useState(false);

  const cleanJSON = (raw: string): string => {
    return raw.replace(/```json|```/g, '').trim();
  };


  const fetchRecommendations = async (userId: string) => {
    try {
      setIsRecommendationsLoading(true);
      const response = await axios.post(`${BACKEND_ENDPOINT}/fetchRecommendations`, {
        userId,
      });
      const cleanJSONData = cleanJSON(response.data.recommendations);
      console.log(cleanJSONData);
      const data = JSON.parse(cleanJSONData);
      console.log(data.recommendations);
      setRecommendations(data.recommendations);
    } catch (error: any) {
      console.error("Error fetching recommendations:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsRecommendationsLoading(false);
    }
  };

  const fetchGenres = async (userId: string) => {
    try {
      setIsGenresLoading(true);
      const response = await axios.post(`${BACKEND_ENDPOINT}/fetchGenres`, {
        userId,
      });
      console.log('Response: ' + response.data);

      const cleanJSONData = cleanJSON(response.data.recommendations);
      console.log(cleanJSONData);
      const data = JSON.parse(cleanJSONData);
      console.log(data.topGenres);
      setGenres(data.topGenres);
    } catch (error: any) {
      console.error("Error fetching genres:", error.response?.data || error.message);
      throw error;
    } finally {
      setIsGenresLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-start gap-4 px-8">

        <Button onClick={() => userId && fetchRecommendations(userId)} disabled={isRecommendationsLoading}>
          Get Recommendations
          {isRecommendationsLoading && <Loader2 className="animate-spin" />}
        </Button>
        <Button onClick={() => userId && fetchGenres(userId)} disabled={isGenresLoading}>
          Get Genres
          {isGenresLoading && <Loader2 className="animate-spin" />}
        </Button>
      </div>

      <div className="w-full px-8">
        <Separator className="my-4 rounded-sm" />
      </div>

      <div className="flex flex-row justify-start items-start w-full gap-16 px-8">


        <Card className='width-1/3'>
          <CardHeader>
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          </CardHeader>
          <div className="flex-1 ml-2">
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="text-left mb-4 text-wrap">
                  <p className="font-bold">{rec.title}</p>
                  <p className="text-sm text-gray-500">{rec.artist}</p>
                </div>
              ))}
            </ul>
          </div>
        </Card>

        <Card className='width-1/3'>
          <CardHeader>
            <h2 className="text-xl font-semibold mb-4">Your Top Genres</h2>
          </CardHeader>
          <div className="flex-1 ml-2">
            <ul className="space-y-2">
              {genres.map((genre, idx) => (
                <div key={idx} className="text-left mb-4 text-wrap">
                  <p className="font-bold">{genre.genre}</p>
                  <p className="text-sm text-gray-500">{genre.explanation}</p>
                </div>
              ))}
            </ul>
          </div>
        </Card>




      </div>
    </>
  );
}