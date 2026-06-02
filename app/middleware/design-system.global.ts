export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();

  if (
    to.path.startsWith("/design-system") &&
    !config.public.enableDesignSystem
  ) {
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }
});
