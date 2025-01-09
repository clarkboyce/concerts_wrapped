import { gradients } from './styles/gradients';

export const slides = [
  {
    id: 0,
    parts: [
      {
        mainText: "Let's look back at your concerts in 2024",
        duration: 6000
      },
      {
        mainText: "Concerts Wrapped 🎁",
        duration: 4000
      }
    ],
    ...gradients.bluePurple
  },
  {
    id: 1,
    parts: [
      {
        mainText: "You saw 12 different artists and spent 3,600 minutes at 15 concerts.",
        subText: "(That is more than 80% of other respondents)",
        duration: 10000
      }
    ],
    ...gradients.pinkPurple
  },
  {
    id: 2,
    parts: [
      {
        preText: "Major bag alert $$$",
        duration: 2000
      },
      {
        mainText: "You spent a total of $1,245 dollars on tickets.",
        subText: "I bet 20% of that was on Fees 😭😭😭",
        duration: 4000
      },
      {
        mainText: "Skip the fees and buy with CampusTicket next time.",
        duration: 4000
      }
    ],
    ...gradients.greenYellow
  },
  {
    id: 4,
    parts: [
      {
        mainText: "Most of the artists you saw were in Rock genre.",
        subText: "1,234 fans felt the same way.",
        duration: 6000
      },
      {
        mainText: "Check out campusticket.com/playlists for some great playlists curated by our team",
        duration: 4000
      }
    ],
    ...gradients.lightBlue
  },
  {
    id: 5,
    parts: [
      {
        mainText: "Your favorite venue was Red Rocks in Morrison, CO",
        duration: 10000
      }
    ],
    ...gradients.orangeYellow
  },
  {
    id: 6,
    parts: [
      {
        mainText: "Before you spend $20 in fees next time check out some of the tickets available on campusticket.",
        duration: 10000
      }
    ],
    ...gradients.redPink
  }
]; 