/**
 * Arquivo de configuração em runtime.
 *
 * Em desenvolvimento, este arquivo existe apenas para garantir que
 * `window.__ENV__` esteja definido, mesmo vazio.
 *
 * Em produção (Docker/Kubernetes), este arquivo DEVE ser sobrescrito.
 *
 * Não adicione valores fixos aqui para produção.
 */

window.__ENV__ = window.__ENV__ || {};