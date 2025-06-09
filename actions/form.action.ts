"use server";

import { defaultBackgroundColor, defaultPrimaryColor } from "@/constant";
import { prisma } from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function fetchFormStats() {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      return {
        success: false,
        message: "Unauthorized to use this resource",
      };
    }

    const { _sum, _count } = await prisma.form.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        views: true,
        responses: true,
      },
      _count: {
        id: true,
      },
    });

    const views = _sum.views ?? 0;
    const totalResponses = _sum.responses ?? 0;
    const totalForms = _count?.id ?? 0;

    const conversionRate = views > 0 ? (totalResponses / views) * 100 : 0;
    const engagementRate =
      totalForms > 0 ? (totalResponses / totalForms) * 100 : 0;

    return {
      success: true,
      views,
      totalForms,
      totalResponses,
      conversionRate,
      engagementRate,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function createForm(data: { name: string; description: string }) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized to use this resource",
      };
    }

    // const jsonblocks = []

    const formSettings = await prisma.formSettings.create({
      data: {
        primaryColor: defaultPrimaryColor,
        backgroundColor: defaultBackgroundColor,
      },
    });

    const form = await prisma.form.create({
      data: {
        name: data.name,
        description: data.description,
        userId: user.id,
        creatorName: user?.given_name || "",
        settingsId: formSettings.id,
      },
    });

    if (!form) {
      return {
        success: false,
        message: "Could not create form, please try again",
      };
    }

    return {
      success: true,
      message: "Form created successfully",
      form,
    };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function fetchAllForms() {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      return {
        success: false,
        message: "Unauthorized to use this resource",
      };
    }

    const form = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      include: {
        settings: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Form fetched successfully",
      form,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
