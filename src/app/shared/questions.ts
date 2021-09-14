import { Question } from "../models/User.model";
import { bb_1,bb_2,bb_3,bb_4 } from "./imgUrl";
export const questions:Question[] = [
    {
      name:
        "Khi tham gia giao thông, trường hợp nào dưới đây là không an toàn, gây nguy hiểm?",
      answer: 2,
      answers: [
        "Đi qua đường cùng người lớn.",
        "Không đội mũ bảo hiểm khi ngồi trên xe mô tô, xe máy.",
        "Đi xe đạp chở 1 người ngồi sau.",
      ],
    },
    {
      name:
        "Khi tham gia giao thông, trường hợp nào dưới đây là không an toàn, gây nguy hiểm?",
      answer: 0,
      answers: [
        "Đi qua đường cùng người lớn.",
        "Không đội mũ bảo hiểm khi ngồi trên xe mô tô, xe máy.",
        "Đi xe đạp chở 1 người ngồi sau.",
        "Đi xe đạp chở 1 người ngồi sau.",
      ],
    },
    {
      name:
        "Khi tham gia giao thông, trường hợp nào dưới đây là không an toàn, gây nguy hiểm?",
      answer: 1,
      answers: [
        "Đi qua đường cùng người lớn.",
        "Không đội mũ bảo hiểm khi ngồi trên xe mô tô, xe máy.",
        "Đi xe đạp chở 1 người ngồi sau.",
        "Đi xe đạp chở 1 người ngồi sau.",
        "Đi xe đạp chở 1 người ngồi sau.",
      ],
    },
    {
      name:
        "Test biển báo giao thông",
      answer: 1,
      type:'picture',
      answers: [
        bb_1,
        bb_2,
        bb_3,
        bb_4
      ],
    },
  ];